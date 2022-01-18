<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    protected $table = 'containers';
    protected $primaryKey = 'id';
    protected $fillable   = [
        'client',
        'number',
        'type',
        'status',
        'category'
    ];
}
