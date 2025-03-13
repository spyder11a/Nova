.PHONY: install start-backend start-frontend run

install:
	@echo "Installing dependencies for frontend and backend..."
	cd frontend && npm install
	cd backend && npm install
	cd backend && source ~/.pyenv/versions/backend-venv/bin/activate
	cd backend && pip install -r requirements.txt
	@echo "Installation complete! ✅"

run: install 
