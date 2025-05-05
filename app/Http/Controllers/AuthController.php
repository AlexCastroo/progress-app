<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\Project;


class AuthController extends Controller
{
    public function register (Request $request)
    {
        try {
            $user = User::create($request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:8'
            ]));

            $user->sendEmailVerificationNotification();

            return redirect()->route('login')->with([
                'message' => 'User created successfully',
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during registration. Please try again later.'
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $fields = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
                'remember' => 'boolean',
            ]);

            $credentials = [
                'email' => $fields['email'],
                'password' => $fields['password'],
            ];

            if (!Auth::attempt($credentials, $fields['remember'] ?? false)) {
                // Log the failed login attempt
                \Log::warning('Login failed', [
                    'email' => $fields['email'],
                    'ip' => $request->ip(),
                    'timestamp' => now(),
                ]);

                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.']
                ]);
            }

            // Regenerate session to prevent session fixation attacks
            session()->regenerate();

            // Log the successful login
            \Log::info('Login successful', [
                'user_id' => Auth::id(),
                'email' => $fields['email'],
                'ip' => $request->ip(),
                'timestamp' => now(),
            ]);


            return redirect()->route('projects')->with([
                'message' => 'Login successful',
                'user' => Auth::user()
            ]);

        } catch (\Exception $e) {
            // Log the exception details
            \Log::error('An error occurred during login', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'ip' => $request->ip(),
                'timestamp' => now(),
            ]);

            return response()->json([
                'message' => 'An error occurred during login. Please try again later.'
            ], 500);
        }
    }

    public function logout()
    {
        try{
            $user = Auth::user();

            Auth::guard('web')->logout();

            // Log the successful logout
            \Log::info('Logout successful', [
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => request()->ip(),
                'timestamp' => now(),
            ]);

            return redirect()->route('login');

        } catch (\Exception $e) {
            // Log the exception details
            \Log::error('An error occurred during logout', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'ip' => request()->ip(),
                'timestamp' => now(),
            ]);
        }
    }

    public function emailVerify($user_id, Request $request)
    {
        try{
            if (!$request->hasValidSignature()) {
                return response()->json([
                    'message' => 'Invalid/Expired URL provided'
                ], 401);
            }

            $user = User::findOrFail($user_id);

            if(!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 400);
            }

            if(!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
                return response()->json([
                    'message' => 'Email verified',
                    'user' => $user
                ]);
            }

            \Log::info("message", [
                'message' => 'Email verified',
                'user_id' => $user->id,
                'email' => $user->email,
                'timestamp' => now(),
            ]);
            return response()->json([
                'message' => 'Email already verified'
            ], 400);
        } catch (\Exception $e) {
            // Log the exception details
            \Log::error('An error occurred during email verification', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'ip' => request()->ip(),
                'timestamp' => now(),
            ]);

            return response()->json([
                'message' => 'An error occurred during email verification. Please try again later.'
            ], 500);
        }


    }

    public function resendEmailVerificationMail(Request $request)
    {
        $user_id = $request->input('user_id');

        $user = User::findOrFail($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified'
            ], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification email sent to your email address'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['message' => __($status)])
                    : response()->json(['message' => __($status)], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json([
                'message' => trans($status),
            ])
            : response()->json([
                'message' => trans($status),
            ], 400);
    }
}
