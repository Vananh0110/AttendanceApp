<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    protected $fillable = [
        'clazz_id',
        'day_of_week',
        'clazz_date',
        'start_time',
        'end_time',
        'destination',
    ];

    public function clazz()
    {
        return $this->belongsTo(Clazz::class);
    }
}
