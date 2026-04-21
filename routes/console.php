<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule monitoring of keramogranit-opt.ru - run every 2 weeks to check for new collections/products
Schedule::command('monitor:lincer --check-collections')
    ->twiceMonthly(1, 15) // Run on 1st and 15th of each month
    ->at('03:00') // Run at 3 AM to avoid peak hours
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/schedule.log'));

// Schedule sitemap regeneration - weekly
Schedule::command('sitemap:generate')
    ->weekly()
    ->sundays()
    ->at('02:00')
    ->withoutOverlapping();

// Schedule automatic price checks (if needed in future)
// Schedule::command('products:check-prices')->daily();

// Clear old logs monthly
Schedule::command('model:prune', ['--model' => [\App\Models\Product::class]])
    ->monthly()
    ->at('01:00');
