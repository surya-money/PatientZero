from config.settings import DB_PATH, LLM_PROVIDER
from db.database import Database
from llm.factory import get_provider

db = Database(DB_PATH)
provider = get_provider(LLM_PROVIDER)
