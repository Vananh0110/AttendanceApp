<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances);
    }

    public function show($id)
    {
        $attendance = Attendance::findOrFail($id);
        return response()->json($attendance);
    }

    public function store(Request $request)
    {
        $attendance = Attendance::create($request->all());
        return response()->json($attendance, 201);
    }

    public function storeList(Request $request)
    {
        $attendancesData = $request->all();
        $attendances = [];

        foreach ($attendancesData as $data) {
            $attendance = Attendance::create([
                'student_name' => $data['student_name'],
                'student_code' => $data['student_code'],
                'clazz_code' => $data['clazz_code'],
                'attendance_date' => $data['attendance_date'],
                'status' => $data['status'],
                'teacher_name' => $data['teacher_name'],
                'teacher_email' => $data['teacher_email'],
            ]);

            $attendances[] = $attendance;
        }

        return response()->json($attendances, 201);
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->update($request->all());
        return response()->json($attendance, 200);
    }

    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();
        return response()->json(null, 204);
    }

    public function getAttendanceDatesByTeacherEmail(Request $request, $teacherEmail)
    {
        $dates = DB::select('
        SELECT DISTINCT attendance_date FROM attendance
        WHERE teacher_email = ?
        ', [$teacherEmail]);

        return response()->json($dates);
    }

    public function getClassCodesByTeacherEmailAndAttendanceDate(Request $request, $teacherEmail, $attendanceDate)
        {
            $clazzCodes = DB::select('
                SELECT DISTINCT clazz_code FROM attendance
                WHERE teacher_email = ? AND attendance_date = ?
            ', [$teacherEmail, $attendanceDate]);

            return response()->json($clazzCodes);
        }

    public function getStudentListAttendance(Request $request, $teacherEmail, $attendanceDate, $clazzCode)
    {
        $students = DB::select('
            SELECT student_name, student_code, status
            FROM attendance
            WHERE teacher_email = ?
            AND attendance_date = ?
            AND clazz_code = ?
            ORDER BY student_name
        ', [$teacherEmail, $attendanceDate, $clazzCode]);

        return response()->json($students);
    }

    public function getAttendanceDateByStudent(Request $request, $student_name)
    {
        $clazzCode = DB::select('
            SELECT DISTINCT attendance_date
            FROM attendance
            WHERE student_name = ?
        ', [$student_name]);

        return response()->json($clazzCode);
    }

    public function getClassByStudentNameAndAttendanceDate(Request $request, $studentName, $attendanceDate)
        {
            $clazzCodes = DB::select('
                SELECT DISTINCT clazz_code FROM attendance
                WHERE student_name = ? AND attendance_date = ?
            ', [$studentName, $attendanceDate]);

            return response()->json($clazzCodes);
        }

        public function getStudentListAttendanceByStudent(Request $request, $attendanceDate, $clazzCode)
        {
            $students = DB::select('
                SELECT id, student_name, student_code, status
                FROM attendance
                WHERE attendance_date = ?
                AND clazz_code = ?
                ORDER BY student_name
            ', [$attendanceDate, $clazzCode]);
    
            return response()->json($students);
        }

        public function getAttendanceDateByClassCode(Request $request, $clazzCode)
        {
            $attendanceDate = DB::select('
                SELECT DISTINCT attendance_date
                FROM attendance
                WHERE clazz_code = ?
            ', [$clazzCode]);
    
            return response()->json($attendanceDate);
        }
}
