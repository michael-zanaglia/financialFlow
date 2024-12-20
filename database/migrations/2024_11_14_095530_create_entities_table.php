<?php

use App\Models\Entity;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $secteur = Entity::SECTEUR;
        sort($secteur);

        Schema::create('entities', function (Blueprint $table) use ($secteur) {
            $table->id();
            $table->string('name');
            $table->enum('secteur', $secteur);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entities');
    }
};
