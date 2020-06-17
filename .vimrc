set nocompatible                " required
filetype off                    " required

let $PYTHONPATH="/usr/lib/python3.8/site-packages"
set number
set relativenumber

syntax enable
set cursorline
set foldlevel=99
set cmdheight=1
set cc=80
call plug#begin('~/.vim/plugged')

 
" Remap arrow keys to nothing
noremap <Up> <Nop> 
noremap <Left> <Nop> 
noremap <Down> <Nop> 
noremap <Right> <Nop> 
nnoremap <C-Left> :tabprevious<CR>
nnoremap <C-Right> :tabnext<CR>
set tabstop=4
set shiftwidth=2
"Plugins
Plug 'tmhedberg/SimpylFold'
Plug 'frazrepo/vim-rainbow'
" Use release branch (recommended)
Plug 'morhetz/gruvbox'
Plug 'nanotech/jellybeans.vim'
Plug 'altercation/vim-colors-solarized'
Plug 'chriskempson/base16-vim'
Plug 'atahabaki/archman-vim' 
Plug 'lifepillar/vim-solarized8'
Plug 'kien/ctrlp.vim'
Plug 'rstacruz/sparkup'
Plug 'sickill/vim-monokai'
Plug 'jeaye/color_coded'
Plug 'terryma/vim-multiple-cursors'
Plug 'kien/ctrlp.vim'
Plug 'tpope/vim-commentary'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'takac/vim-hardtime'
Plug 'mattn/emmet-vim'
Plug 'alvan/vim-closetag'
Plug 'tpope/vim-surround'
"Plug 'itchyny/lightline.vim'
noremap <Up> <Nop> 
set laststatus=2
colorscheme gruvbox
set background=dark
"Set Transparency
hi Normal guibg=NONE ctermbg=NONE
" TextEdit might fail if hidden is not set.
set hidden
"CtrlP setup
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'

"Remove .git and venv from search
let g:ctrlp_custom_ignore = 'venv\|git\|__pycache__'
"Open directory if nothing opened
let g:ctrlp_working_path_mode = 'ra'

"Activate HardTime
let g:hardtime_default_on = 0
"Coc setup

" Give more space for displaying messages.
set cmdheight=5

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction



call plug#end()                 " required
