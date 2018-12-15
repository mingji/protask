<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

use App\Models\Task;

class TaskList extends Model
{

    public function parseData() {
        $res = $this;
        $res->tasks = Task::where('list_id', $this->id)->where('del_flg', 0)->get();
        return $res;
    }
}
