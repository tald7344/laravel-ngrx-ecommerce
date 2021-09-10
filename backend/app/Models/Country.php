<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'countries_name_ar',
        'countries_name_en',
        'mob',
        'code',
        'base_url',
        'logo'
    ];
}
