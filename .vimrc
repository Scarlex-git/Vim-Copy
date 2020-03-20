set nocompatible              " required
filetype off                  " required

"Enable folding
set foldmethod=indent
set foldlevel=99
set number

syntax on
set cursorline
call plug#begin('~/.vim/plugged')

"Enable folding using the spacebar
nnoremap <space> za
nnoremap <C-t> :NERDTree<CR>
nnoremap <C-b> :!gcc

nnoremap <C-Left> :tabprevious<CR>
nnoremap <C-Right> :tabnext<CR>
"Plugins
Plug 'preservim/nerdtree'
Plug 'tmhedberg/SimpylFold'
Plug 'frazrepo/vim-rainbow'
Plug 'morhetz/gruvbox'
Plug 'nanotech/jellybeans.vim'
Plug 'ycm-core/YouCompleteMe'

colo gruvbox
set bg=dark
call plug#end()
