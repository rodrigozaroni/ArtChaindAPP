# ArtChaindAPP
FrontEnd Proposal

sudo apt update
sudo apt install nodejs npm
npm install -g typescript

-----------------------

Vide: https://nextjs.org/docs/getting-started/installation
npx create-next-app@latest

Copie o código do arquivo exemplo sobre o page.tsx
e depois

Instalar o Frame de UI

npx shadcn@latest init

Depois colocar os componentes

--- Precisa instalar os componentes
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

npx shadcn@latest add button input select dialog 

-- Agora instale a biblioteca de ícone
import { Search, Calendar, MapPin, User, LogOut, QrCode } from 'lucide-react';

npm i lucide-react

Para iniciar 
npm run dev

Se der erro de use client, confira se existe este código na 1a linha.

"use client" // Componente Renderizador
