"use client"

import { useState, useRef, useEffect } from "react"
import { AlertCircle, Upload, Check, X, Download } from "lucide-react"
import type { Product } from "@/lib/products-data"
import {
  processYaninoFile,
  processZavodFile,
  processPriceFile,
  type ExcelProcessResult,
} from "@/lib/excel-processor"
import { verifyAdminAccess } from "@/lib/admin-auth"
import { getAdminSession, setAdminSession, clearAdminSession } from "@/lib/admin-session"
import { useProducts } from "@/lib/products-context"

interface ProcessingResult {
  fileType: string
  result: ExcelProcessResult
}

export default function AdminContent() {
  const { products: contextProducts, updateProducts } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [authError, setAuthError] = useState("")
  const [products, setProducts] = useState<Product[]>(contextProducts)
  const [processingResults, setProcessingResults] = useState<ProcessingResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const yaninoFileRef = useRef<HTMLInputElement>(null)
  const zavodFileRef = useRef<HTMLInputElement>(null)
  const priceFileRef = useRef<HTMLInputElement>(null)

  // Initialize products on mount
  useEffect(() => {
    setProducts(contextProducts)
    
    // Check for existing valid session
    const { isValid, isExpired } = getAdminSession()
    if (isValid) {
      setIsAuthenticated(true)
    } else if (isExpired) {
      setAuthError("Сессия истекла, введите пароль снова")
    }
  }, [contextProducts])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")

    if (verifyAdminAccess(passcode)) {
      setAdminSession()
      setIsAuthenticated(true)
      setPasscode("")
    } else {
      setAuthError("Неверный пароль")
    }
  }

  const handleLogout = () => {
    clearAdminSession()
    setIsAuthenticated(false)
    setPasscode("")
    setProcessingResults([])
    setProducts(contextProducts)
    setSuccessMessage("")
  }

  // Sync products back to context when state changes after file processing
  const saveUpdatedProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    updateProducts(updatedProducts)
  }

  const handleFileUpload = async (fileType: "yanino" | "zavod" | "price") => {
    const fileInput =
      fileType === "yanino" ? yaninoFileRef.current : fileType === "zavod" ? zavodFileRef.current : priceFileRef.current

    if (!fileInput?.files?.[0]) {
      setAuthError("Пожалуйста, выберите файл")
      return
    }

    setIsProcessing(true)
    setAuthError("")

    try {
      const file = fileInput.files[0]
      let result: ExcelProcessResult

      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()

      if (fileType === "yanino") {
        result = processYaninoFile(arrayBuffer, products)
      } else if (fileType === "zavod") {
        result = processZavodFile(arrayBuffer, products)
      } else {
        result = processPriceFile(arrayBuffer, products)
      }

      setProcessingResults((prev) => [
        ...prev,
        {
          fileType:
            fileType === "yanino"
              ? "Остатки Янино"
              : fileType === "zavod"
                ? "Остатки Завод"
                : "Прайс Линцер",
          result,
        },
      ])

      setProducts(result.updatedProducts)
      saveUpdatedProducts(result.updatedProducts)

      // Clear the input
      fileInput.value = ""
    } catch (error) {
      setAuthError(`Ошибка обработки файла: ${error instanceof Error ? error.message : "неизвестная ошибка"}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSaveUpdates = () => {
    // Save to context which handles localStorage persistence
    updateProducts(products)
    setSuccessMessage("✓ Данные сохранены")
  }

  const handleResetData = () => {
    if (confirm("Вы уверены? Все изменения будут отменены.")) {
      setProducts(contextProducts)
      setProcessingResults([])
      setSuccessMessage("✓ Данные сброшены")
    }
  }

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "products-backup.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Админ-панель</h1>
          <p className="text-foreground/60 text-center mb-6">Введите пароль для доступа</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Пароль</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{authError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Админ-панель</h1>
            <p className="text-foreground/60 mt-1">Загрузка и управление товарами</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors"
          >
            Выход
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {authError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {authError}
          </div>
        )}

        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Загрузка файлов</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Янино File */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-foreground mb-2">Остатки Янино</label>
                <input
                  ref={yaninoFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="block w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                  disabled={isProcessing}
                />
                <button
                  onClick={() => handleFileUpload("yanino")}
                  disabled={isProcessing}
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  Загрузить
                </button>
              </div>

              {/* Завод File */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-foreground mb-2">Остатки Завод</label>
                <input
                  ref={zavodFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="block w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                  disabled={isProcessing}
                />
                <button
                  onClick={() => handleFileUpload("zavod")}
                  disabled={isProcessing}
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  Загрузить
                </button>
              </div>

              {/* Price File */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-foreground mb-2">Прайс Линцер</label>
                <input
                  ref={priceFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="block w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                  disabled={isProcessing}
                />
                <button
                  onClick={() => handleFileUpload("price")}
                  disabled={isProcessing}
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  Загрузить
                </button>
              </div>
            </div>
          </div>

          {/* Processing Results */}
          {processingResults.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Результаты обработки</h2>

              <div className="space-y-4">
                {processingResults.map((res, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {res.result.matchedCount > 0 ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />}
                        {res.fileType}
                      </h3>
                    </div>

                    <div className="text-sm text-foreground/60 space-y-1">
                      <p>Совпадено товаров: {res.result.matchedCount}</p>
                      <p>Обновлено: {res.result.matchedCount}</p>
                      {res.result.unmatched.length > 0 && (
                        <p className="text-xs text-amber-600 mt-2">
                          Артикулов в файле не найдено на сайте: {res.result.unmatched.length}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveUpdates}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Сохранить изменения
            </button>
            <button
              onClick={handleDownloadJSON}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Скачать JSON
            </button>
            <button
              onClick={handleResetData}
              className="flex-1 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Сбросить
            </button>
          </div>

          {/* Product Count */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-foreground/60">
              Всего товаров: <span className="font-bold text-foreground">{products.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
