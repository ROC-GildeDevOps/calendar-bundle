<?php

namespace Calendar\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class CalendarEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $title = null;

    #[ORM\Column(name: '`start`', type: 'datetime')]
    public ?\DateTimeInterface $start = null;

    #[ORM\Column(name: '`end`', type: 'datetime', nullable: true)]
    public ?\DateTimeInterface $end = null;

    #[ORM\Column(type: 'boolean')]
    public bool $allDay = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): static
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(?\DateTimeInterface $end): static
    {
        $this->end = $end;

        return $this;
    }

    public function isAllDay(): bool
    {
        return $this->allDay;
    }

    public function setAllDay(bool $allDay): static
    {
        $this->allDay = $allDay;

        return $this;
    }
}
