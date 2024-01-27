<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teachers';

    protected $fillable = [
        'teacher_name',
        'teacher_code',
        'teacher_email',
    ];

    public function clazzes()
    {
        return $this->hasMany(Clazz::class);
    }

    // public function attendances()
    // {
    //     return $this->hasMany(Attendance::class);
    // }
}
