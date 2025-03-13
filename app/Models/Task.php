<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'category',
        'status',
        'description',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class); // Asumiendo que cada tarea pertenece a un proyecto
    }

}


