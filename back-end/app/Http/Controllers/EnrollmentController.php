<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::all();
        return response()->json($enrollments);
    }

    public function show($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        return response()->json($enrollment);
    }

    public function store(Request $request)
    {
        $enrollment = Enrollment::create($request->all());
        return response()->json($enrollment, 201);
    }

    public function update(Request $request, $id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->update($request->all());
        return response()->json($enrollment, 200);
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();
        return response()->json(null, 204);
    }

    public function getStudentListByClazzCode($clazzCode)
    {
        $students = DB::select('
            SELECT s.student_name, s.student_code, s.student_email, s.gender, s.date_of_birth
            FROM students s
            JOIN enrollments e ON s.id = e.student_id
            JOIN clazzes c ON e.clazz_id = c.id
            WHERE c.clazz_code = ?
            ORDER BY s.student_name
        ', [$clazzCode]);

        return response()->json($students);
    }
}
