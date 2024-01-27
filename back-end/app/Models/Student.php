<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'student_name',
        'student_code',
        'student_face_encoding',
        'student_email',
        'gender',
        'date_of_birth',
    ];

    public function clazzes()
    {
        return $this->belongsToMany(Clazz::class);
    }

    // public function attendances()
    // {
    //     return $this->hasMany(Attendance::class);
    // }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
