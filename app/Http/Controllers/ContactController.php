<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function sendQuestion(Request $request)
    {
        // Валидация
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'type' => 'required|string',
            'sku' => 'nullable|string|max:50',
            'message' => 'required|string|max:2000',
        ], [
            'name.required' => 'Укажите ваше имя',
            'contact.required' => 'Укажите телефон или email',
            'message.required' => 'Напишите ваш вопрос',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 422);
        }

        $data = $validator->validated();

        // Типы обращений
        $types = [
            'question' => 'Вопрос о товаре',
            'calculation' => 'Расчет количества',
            'analog' => 'Подобрать аналог',
            'order' => 'Оформить заказ',
            'other' => 'Другое',
        ];

        try {
            // Отправка email
            Mail::send([], [], function ($message) use ($data, $types) {
                $message->to('novorom@mail.ru')
                    ->subject('Новое обращение с сайта Lincer Янино')
                    ->html($this->buildEmailHtml($data, $types));
            });

            // Можно также отправить уведомление в Telegram
            // $this->sendTelegramNotification($data);

            return response()->json([
                'success' => true,
                'message' => 'Ваше сообщение отправлено!'
            ]);

        } catch (\Exception $e) {
            \Log::error('Ошибка отправки формы: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ошибка отправки. Попробуйте позвонить: ' . env('CONTACT_PHONE')
            ], 500);
        }
    }

    private function buildEmailHtml($data, $types)
    {
        $type = $types[$data['type']] ?? $data['type'];
        $sku = $data['sku'] ? "<br><strong>Артикул:</strong> {$data['sku']}" : '';

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1E40AF; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .footer { background: #374151; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; }
        .field { margin-bottom: 15px; }
        .field strong { display: inline-block; width: 150px; color: #374151; }
        .message { background: white; padding: 15px; border-left: 4px solid #1E40AF; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">🏆 Lincer Янино</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Новое обращение с сайта</p>
        </div>
        
        <div class="content">
            <div class="field">
                <strong>Тип обращения:</strong> {$type}
            </div>
            <div class="field">
                <strong>Имя:</strong> {$data['name']}
            </div>
            <div class="field">
                <strong>Контакт:</strong> {$data['contact']}
            </div>
            {$sku}
            <div class="field">
                <strong>Дата/Время:</strong> {now()->format('d.m.Y H:i')}
            </div>
            
            <div class="message">
                <strong>Сообщение:</strong><br>
                {nl2br(htmlspecialchars($data['message']))}
            </div>
        </div>
        
        <div class="footer">
            <p style="margin: 0;">Ответьте клиенту в течение 30 минут</p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">© Lincer Янино</p>
        </div>
    </div>
</body>
</html>
HTML;
    }

    // Опционально: отправка в Telegram
    private function sendTelegramNotification($data)
    {
        $token = env('TELEGRAM_BOT_TOKEN');
        $chatId = env('TELEGRAM_ADMIN_CHAT_ID');

        if (!$token || !$chatId) {
            return;
        }

        $text = "🆕 Новое обращение\n\n";
        $text .= "👤 {$data['name']}\n";
        $text .= "📱 {$data['contact']}\n";
        $text .= "📋 {$data['type']}\n";
        if ($data['sku']) {
            $text .= "🔖 Артикул: {$data['sku']}\n";
        }
        $text .= "\n💬 {$data['message']}";

        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.telegram.org/bot{$token}/sendMessage");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, [
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'HTML'
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_exec($ch);
            curl_close($ch);
        } catch (\Exception $e) {
            \Log::error('Telegram notification failed: ' . $e->getMessage());
        }
    }
}
