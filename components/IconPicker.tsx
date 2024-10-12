"use client";

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Icons from 'react-icons/fa';

const iconList = Object.keys(Icons)
  .filter(key => key !== "IconContext")
  .map(key => ({ name: key, component: Icons[key as keyof typeof Icons] }));

type IconPickerProps = {
  icon: string;
  onSelect?: (icon: string) => void;
};

export function IconPicker({ icon, onSelect }: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    if (onSelect) {
      onSelect(iconName);
    }
  };

  const filteredIcons = iconList.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SelectedIcon = Icons[selectedIcon as keyof typeof Icons] || Icons.FaRegCircle;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 p-0">
          <SelectedIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
          {filteredIcons.map((icon) => (
            <Button
              key={icon.name}
              variant="outline"
              className="h-10 w-10 p-0"
              onClick={() => handleSelect(icon.name)}
            >
              <icon.component className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}