<?php

use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::middleware([
//     'auth:sanctum',
// ])->group(function(){
//     Route::post("/getUserData/{id}",[DataController::class,"getUserData"])->name("api.datacontroller");
// });

Route::post("/getUserData/{id}",[DataController::class,"getUserData"])->name("api.datacontroller");
Route::post("/entities",[DataController::class,"getEntities"])->name("api.datacontroller.entities");

Route::middleware([
    'auth:sanctum',
    ])->group(function () {
        // Route::patch("/send",[DataController::class,"updateHistoryUser"])->name("api.datacontroller.updateHistoryUser");
});
