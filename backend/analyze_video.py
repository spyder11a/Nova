import sys
import os
import cv2
import torch
import clip
from PIL import Image

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Labels for detection
labels = ["gun", "knife", "weapon", "harmless object"]
threshold = 0.9  # Updated confidence threshold

def extract_frames(video_path, output_folder="frames"):
    os.makedirs(output_folder, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    frames = []

    while True:
        success, frame = cap.read()
        if not success:
            break
        frame_path = f"{output_folder}/frame_{frame_count}.jpg"
        cv2.imwrite(frame_path, frame)
        frames.append(frame_path)
        frame_count += 1

    cap.release()
    print(f"✅ Extracted {frame_count} frames")
    return frames

def analyze_frame(image_path):
    image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    text_inputs = clip.tokenize(labels).to(device)
    with torch.no_grad():
        logits_per_image, _ = model(image, text_inputs)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()[0]

    best_match_idx = probs.argmax()
    best_label = labels[best_match_idx]
    confidence = probs[best_match_idx]

    return best_label, confidence

def main(video_path):
    print("🔍 Extracting frames from video...")
    frames = extract_frames(video_path)
    
    threat_detected = False

    print("🔎 Analyzing frames using CLIP...")
    for i, frame in enumerate(frames):
        label, confidence = analyze_frame(frame)
        print(f"🖼️ Frame {i+1}/{len(frames)} - Detected: {label} (Confidence: {confidence:.2f})")

        if label in ["gun", "knife", "weapon"] and confidence >= threshold:
            print("⚠️ Threat detected! (Confidence: {:.2f})".format(confidence))
            threat_detected = True
            break  # Stop early if a threat is detected

    # Clean up extracted frames
    for frame in frames:
        os.remove(frame)
    print("🗑️ Cleaned up temporary files.")

    print("🚨 Threat detected!" if threat_detected else "✅ No threats found")
    print("True" if not threat_detected else "False")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ No video file provided.")
        sys.exit(1)

    video_file = sys.argv[1]
    if not os.path.exists(video_file):
        print("❌ Video file does not exist.")
        sys.exit(1)

    main(video_file)
