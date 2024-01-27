<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clazz;
use Illuminate\Support\Facades\DB;

class ClazzController extends Controller
{
    public function index()
    {
        $clazzes = Clazz::all();
        return response()->json($clazzes);
    }

    public function show($id)
    {
        $clazz = Clazz::findOrFail($id);
        return response()->json($clazz);
    }

    public function store(Request $request)
    {
        $clazz = Clazz::create($request->all());
        return response()->json($clazz, 201);
    }

    public function update(Request $request, $id)
    {
        $clazz = Clazz::findOrFail($id);
        $clazz->update($request->all());
        return response()->json($clazz, 200);
    }

    public function destroy($id)
    {
        $clazz = Clazz::findOrFail($id);
        $clazz->delete();
        return response()->json(null, 204);
    }

    public function getDetailClazz(){
        $clazz = DB::select('
            SELECT cl.id, cl.clazz_code, c.course_name, course_id, t.teacher_name, t.teacher_email, teacher_id, s.semester_name, semester_id
            FROM clazzes cl
            JOIN courses c ON cl.course_id = c.id
            JOIN teachers t ON cl.teacher_id = t.id
            JOIN semesters s ON cl.semester_id = s.id;
        ');

        return response()->json($clazz);
    }

    public function getClassTeacherByCourseId(Request $request, $courseId){
        $clazz = DB::select('
        SELECT c.clazz_code, c.teacher_id, t.teacher_name, t.teacher_email
        FROM clazzes c
        JOIN teachers t ON c.teacher_id = t.id
        WHERE c.course_id = ?
        ', [$courseId]);

        return response()->json($clazz);
    }
}
