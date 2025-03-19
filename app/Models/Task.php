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

    public function user()
    {
        return $this->belongsTo(User::class); // Asumiendo que cada tarea pertenece a un usuario
    }

    public function taskHistories()
    {
        return $this->hasMany(TaskHistory::class); // Asumiendo que cada tarea tiene varios historiales
    }

    public function sprint()
    {
        return $this->belongsTo(Sprint::class); // Asumiendo que cada tarea pertenece a un sprint
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class); // Asumiendo que cada tarea tiene varias etiquetas
    }



}


