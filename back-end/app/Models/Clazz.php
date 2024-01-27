<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clazz extends Model
{
    use HasFactory;

    protected $table = 'clazzes';

    protected $fillable = [
        'clazz_code',
        'course_id',
        'teacher_id',
        'semester_id'
    ];

    public function semester (){
        return $this->belongsTo(Semester::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    // public function attendances()
    // {
    //     return $this->hasMany(Attendance::class);
    // }
}
