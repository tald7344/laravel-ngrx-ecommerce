@component('mail::message')
# Introduction

To reset your password or create new one please click this button below
@component('mail::button', ['url' => 'http://localhost:4200/admin/auth/reset-password?token=' . $token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
