#!/usr/bin/env python3
import os
import glob
import argparse

def collect_image_files(folder, exts):
    files = []
    for ext in exts:
        files.extend(glob.glob(os.path.join(folder, f'*.{ext}'), recursive=False))
    return sorted(files)

def rename_images(folder):
    # 1) Recopilar archivos de imagen
    exts = ['png', 'jpg', 'jpeg']
    files = collect_image_files(folder, exts)
    if not files:
        print("No se han encontrado imágenes con extensiones png/jpg/jpeg.")
        return

    # 2) Fase 1: renombrado a nombres temporales
    temp_paths = []
    for idx, old_path in enumerate(files, start=1):
        dirp, old_name = os.path.split(old_path)
        _, ext = os.path.splitext(old_name)
        temp_name = f".tmp_ren_{idx}{ext.lower()}"
        temp_path = os.path.join(dirp, temp_name)
        os.rename(old_path, temp_path)
        temp_paths.append((idx, temp_path))
        print(f"Temporal: {old_name} → {temp_name}")

    # 3) Fase 2: renombrado a nombre final img{n}
    for idx, temp_path in temp_paths:
        dirp, tmp_name = os.path.split(temp_path)
        _, ext = os.path.splitext(tmp_name)
        final_name = f"img{idx}{ext}"
        final_path = os.path.join(dirp, final_name)
        os.rename(temp_path, final_path)
        print(f"Final: {tmp_name} → {final_name}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Renombra todas las imágenes (png/jpg/jpeg) de una carpeta a img1.ext, img2.ext, …"
    )
    parser.add_argument(
        "folder",
        nargs="?",
        default=".",
        help="Carpeta donde están las imágenes (por defecto, la carpeta actual)."
    )
    args = parser.parse_args()
    rename_images(args.folder)
