<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    //
    public function index()
    {
        $permissions = Permission::latest()->paginate(5);
        $permissions->getCollection()->transform(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'created_at' => $permission->created_at->format('d-m-Y'),
            ];
        });

        return Inertia::render('permissions/index', compact('permissions'));
    }

    public function store(Request $request)
    {
        Permission::create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]));

        return to_route('permissions.index')
            ->with('message', 'Permission created successfully.');
    }
}
