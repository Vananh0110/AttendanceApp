<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    protected $table = 'semesters';

    protected $fillable = [
        'semester_name',
        'semester_start_date',
        'semester_end_date'
    ];


    public function clazzes()
    {
        return $this->hasMany(Clazz::class);
    }
}
