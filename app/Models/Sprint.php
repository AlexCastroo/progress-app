<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sprint extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'start_date',
        'end_date',
        'start_at',
        'end_at',
        'total_time',
        'is_paused',
        'status',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
