<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $hidden = ['updated_at', 'del_flg'];
    
}
