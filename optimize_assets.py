import os
from PIL import Image
import glob

def optimize_images():
    assets_dir = os.path.join(os.getcwd(), 'public', 'media')
    print(f"Optimizing images in: {assets_dir}")
    
    # improved matching pattern
    files = glob.glob(os.path.join(assets_dir, "ezgif-frame-*.png"))
    total_files = len(files)
    
    if total_files == 0:
        print("No images found to optimize.")
        return

    print(f"Found {total_files} images. Starting optimization...")

    for index, file_path in enumerate(files):
        try:
            with Image.open(file_path) as img:
                # Resize if too large (e.g. > 1920 width)
                if img.width > 1920:
                    ratio = 1920 / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
                
                # Save as WebP
                webp_path = file_path.replace(".png", ".webp")
                img.save(webp_path, "WEBP", quality=80)
                
                # Remove original PNG to save space/confusion
                os.remove(file_path)
                
                print(f"[{index+1}/{total_files}] Converted: {os.path.basename(file_path)} -> {os.path.basename(webp_path)}")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print("Optimization complete!")

if __name__ == "__main__":
    optimize_images()
