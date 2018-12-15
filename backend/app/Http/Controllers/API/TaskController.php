<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Models\Task;

class TaskController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    public function index()
    {
        
    }

    public function store(Request $request)
    {
        $res = ['success' => true];
        $params = $request->input();
        
        if($params['id'] == 0) {
            $task = new Task();
            $task->user_id = auth()->user()->id;
            $task->list_id = $params['list_id'];
        } else {
            $task = Task::find($params['id']);
        }

        $task->name = $params['name'];
        $task->description = $params['description'];
        $task->status = $params['status'];

        if($params['status'] == 2) { // complete
            $task->finished_at = date('Y-m-d H:i:s');
        } else {
            $task->finished_at = null;
        }
        
        $task->save();
        $res['data'] = $task;
        return $res;
    }

    public function destroy($id)
    {
        $res = ['success'=>true];

        $task = Task::find($id);
        if (is_null($task)) {
            $res['success'] = false;
            $res['error'] = 'Invalid Task';
            return $res;
        }

        $task->del_flg = 1;
        $task->save();
        return $res;

    }
}
