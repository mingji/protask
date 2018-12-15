<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\Models\Task;
use App\Models\TaskList;

class TaskListController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    public function index()
    {
        $res = ['success' => true];
        $task_lists = TaskList::where('user_id', auth()->user()->id)
                                ->where('del_flg', 0)
                                ->get();
        foreach ($task_lists as $one) {
            $one = $one->parseData();
        } 
        $res['data'] = $task_lists;
        return $res;
    }

    public function store(Request $request)
    {
        $res = ['success' => true];
        $params = $request->input();
        
        if($params['id'] == 0) {
            $task_list = new TaskList();
            $task_list->user_id = auth()->user()->id;
        } else {
            $task_list = TaskList::find($params['id']);
        }

        $task_list->name = $params['name'];
        $task_list->save();
        $res['data'] = $task_list->parseData();
        return $res;
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
        $res = ['success' => true];
        
        $task_list = TaskList::find($id);
        if($task_list) {
            $task_list->del_flg = 1;
            $task_list->save();
        }
        return $res;
    }
}
