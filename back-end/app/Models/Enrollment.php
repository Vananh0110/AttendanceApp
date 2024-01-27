<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';

    protected $fillable = [
        'clazz_id',
        'student_id',
    ];

    public function clazz()
    {
        return $this->belongsTo(Clazz::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
