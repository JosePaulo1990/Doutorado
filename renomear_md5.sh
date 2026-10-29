#!/bin/bash

# Direitório alvo (usa o diretório atual se nenhum for passado como argumento)
DIR="${1:-.}"

# Verifica se o diretório existe
if [ ! -d "$DIR" ]; then
    echo "Erro: O diretório '$DIR' não existe."
    exit 1
fi

echo "Processando arquivos em: $DIR"
echo "----------------------------------------"

# Loop por todos os arquivos no diretório
for file in "$DIR"/*; do
    # Verifica se é um arquivo comum (ignora diretórios e links)
    if [ -f "$file" ]; then
        # Extrai o caminho, nome, extensão e o hash MD5
        filename=$(basename -- "$file")
        
        # Pula o próprio script caso ele esteja dentro da pasta
        if [ "$filename" == "$(basename -- "$0")" ]; then
            continue
        fi

        # Extrai a extensão do arquivo (se houver)
        extension=""
        if [[ "$filename" == *.* ]]; then
            extension=".${filename##*.}"
        fi

        # Calcula o hash MD5 do conteúdo do arquivo
        md5_hash=$(md5sum "$file" | awk '{print $1}')
        
        new_name="${md5_hash}${extension}"
        new_filepath="$DIR/$new_name"

        # Renomeia o arquivo apenas se o novo nome for diferente do atual
        if [ "$filename" != "$new_name" ]; then
            mv -n "$file" "$new_filepath"
            echo "Renomeado: '$filename' -> '$new_name'"
        else
            echo "Mantido (já possui nome em MD5): '$filename'"
        fi
    fi
done

echo "----------------------------------------"
echo "Concluído!"
