"""
HuggingFace, KoalaAI 
"""
from transformers import AutoModelForSequenceClassification, AutoTokenizer

model = AutoModelForSequenceClassification.from_pretrained("KoalaAI/Text-Moderation")
tokenizer = AutoTokenizer.from_pretrained("KoalaAI/Text-Moderation")

# run model via input (work on this)
CONST_IN_TEST = "F*CK YOU ALL"
inputs = tokenizer(str(CONST_IN_TEST), return_tensors="pt")
outputs = model(**inputs)

logits = outputs.logits
probabilities = logits.softmax(dim=-1).squeeze()

id2label=model.config.id2label
labels= [id2label[idx] for idx in range(len(probabilities))]

label_prob_pairs = list(zip(labels, probabilities))
label_prob_pairs.sort(key=lambda item: item[1], reverse=True)
#print(label_prob_pairs.items())
#print(label_prob_pairs.unique().tolist())

for label, prob in label_prob_pairs:
    print(f"Label: {label} - Probability: {prob}")

SAFETY_TH = 0.910
dangerous_filt = [
    item for item in label_prob_pairs
    if item <= SAFETY_TH
]
#print(dangerous_filt.sort(reverse=True))