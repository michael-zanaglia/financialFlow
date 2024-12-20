<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PageController;
use App\Actions\UserHistory\GetUserHistory;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function (GetUserHistory $getUserHistory) {
        $userHistory = $getUserHistory->get(Auth::id());
        return Inertia::render('Dashboard',[
            "userHistory" => $userHistory ? json_decode($userHistory->history, true) : null,
        ]);
    })->name('dashboard');

    Route::get('/profile', [PageController::class, 'profile'])->name('page-profile');

    Route::get('/contacts', [PageController::class, 'contacts'])->name('page-contacts');
    Route::post('/contacts',[DataController::class, "searchFriend"])->name('datacontroller.searchFriend');

    Route::delete('/delete-contact/{id}', [DataController::class, 'deleteFriend'])->name('datacontroller.deleteFriend');

    Route::get('/add-contact', [PageController::class, 'addContact'])->name('page-add-contacts');
    Route::get('/search-contact',[DataController::class, "searchContact"])->name('datacontroller.searchContact');
    Route::post('/sendRequest', [DataController::class, 'sendRequest'])->name('datacontroller.sendRequest');

    Route::get('/actions/send', [PageController::class, 'actionSend'])->name('action-send');
    Route::post('/actions/send', [PageController::class, 'actionSendPost'])->name('action-send-post');
    Route::post("/send",[DataController::class,"updateHistoryUser"])->name("datacontroller.updateHistoryUser");

    Route::get('/history', [PageController::class, 'actionHistory'])->name('action-history');

    Route::get('/friend-list',[DataController::class, "friendList"])->name('datacontroller.friendList');
    Route::post('/friend-list/accept',[DataController::class, "acceptFriend"])->name('datacontroller.acceptFriend');
    Route::post('/friend-list/refuse',[DataController::class, "refuseFriend"])->name('datacontroller.refuseFriend');
});
