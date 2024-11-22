<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Webeak\Bundle\EssentialBundle\Entity\AbstractEntity;

#[ORM\Entity()]
class Recipe extends AbstractEntity
{

#[ORM\Column(type: "string", length: 255)]
private string $title;

#[ORM\Column(type: "string", length: 255)]
private string $description;

#[ORM\Column(type: "integer")]
private string $preparationTime;

#[ORM\Column(type: "json")]
private array $ingredients = [];

#[ORM\Column(type: "json")]
private array $steps = [];

// Getters et Setters

public function getTitle(): string
{
return $this->title;
}

public function setTitle(string $title): self
{
$this->title = $title;
return $this;
}

public function getDescription(): string
{
return $this->description;
}

public function setDescription(string $description): self
{
$this->description = $description;
return $this;
}

public function getPreparationTime(): string
{
return $this->preparationTime;
}

public function setPreparationTime(string $preparationTime): self
{
$this->preparationTime = $preparationTime;
return $this;
}

public function getIngredients(): array
{
return $this->ingredients;
}

public function setIngredients(array $ingredients): self
{
$this->ingredients = $ingredients;
return $this;
}

public function getSteps(): array
{
return $this->steps;
}

public function setSteps(array $steps): self
{
$this->steps = $steps;
return $this;
}
}
