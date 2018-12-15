<?php
Route::group([ 'middleware' => 'api', 'namespace' => 'API' ], function () {
    Route::post('login',                'AuthController@login');
    Route::post('signup',               'AuthController@signup');
    Route::post('logout',               'AuthController@logout');
    Route::post('refresh',              'AuthController@refresh');
    Route::post('me',                   'AuthController@me');
    Route::post('sendPasswordResetLink','ResetPasswordController@sendEmail');
    Route::post('resetPassword',        'ChangePasswordController@process');

    Route::resource('tasks',             'TaskController');
    Route::resource('task-lists',        'TaskListController');
});