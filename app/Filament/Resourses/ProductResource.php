<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    
    protected static ?string $navigationLabel = 'Товары (Lincer)';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Основная информация')
                    ->schema([
                        Forms\Components\TextInput::make('sku')
                            ->label('Артикул')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('name')
                            ->label('Название')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('brand')
                            ->label('Бренд')
                            ->default('Lincer')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('collection')
                            ->label('Коллекция')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->label('URL (slug)')
                            ->maxLength(255)
                            ->helperText('Генерируется автоматически при импорте'),
                    ])->columns(2),

                Forms\Components\Section::make('Характеристики')
                    ->schema([
                        Forms\Components\TextInput::make('format')
                            ->label('Размер')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('surface')
                            ->label('Поверхность')
                            ->maxLength(255),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Активен')
                            ->default(true),
                    ])->columns(3),

                Forms\Components\Section::make('Цены')
                    ->schema([
                        Forms\Components\TextInput::make('price_official')
                            ->label('Официальная цена')
                            ->numeric()
                            ->prefix('₽')
                            ->step(0.01),
                        Forms\Components\TextInput::make('price_retail')
                            ->label('Цена розница (-20%)')
                            ->numeric()
                            ->prefix('₽')
                            ->step(0.01)
                            ->helperText('Автоматически рассчитывается при импорте'),
                    ])->columns(2),

                Forms\Components\Section::make('Остатки')
                    ->schema([
                        Forms\Components\TextInput::make('stock_yanino')
                            ->label('Склад Янино')
                            ->numeric()
                            ->default(0)
                            ->step(0.01),
                        Forms\Components\TextInput::make('stock_factory')
                            ->label('Склад Завод')
                            ->numeric()
                            ->default(0)
                            ->step(0.01),
                    ])->columns(2),

                Forms\Components\Section::make('Медиа')
                    ->schema([
                        Forms\Components\Textarea::make('images')
                            ->label('Ссылки на изображения')
                            ->rows(3)
                            ->helperText('Ссылки на изображения, разделенные запятой'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sku')
                    ->label('Артикул')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Название')
                    ->searchable()
                    ->limit(30)
                    ->wrap(),
                Tables\Columns\TextColumn::make('collection')
                    ->label('Коллекция')
                    ->badge()
                    ->color('gray')
                    ->searchable(),
                Tables\Columns\TextColumn::make('format')
                    ->label('Размер')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('price_official')
                    ->label('Офиц. цена')
                    ->money('RUB')
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('price_retail')
                    ->label('Цена (-20%)')
                    ->money('RUB')
                    ->sortable()
                    ->color('success'),
                Tables\Columns\TextColumn::make('stock_yanino')
                    ->label('Янино')
                    ->numeric(decimalPlaces: 2)
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('stock_factory')
                    ->label('Завод')
                    ->numeric(decimalPlaces: 2)
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Активен')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Создан')
                    ->dateTime('d.m.Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('brand')
                    ->label('Бренд')
                    ->options([
                        'Lincer' => 'Lincer',
                    ]),
                Tables\Filters\SelectFilter::make('collection')
                    ->label('Коллекция')
                    ->multiple()
                    ->searchable(),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Активность')
                    ->placeholder('Все товары')
                    ->trueLabel('Только активные')
                    ->falseLabel('Только неактивные'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
