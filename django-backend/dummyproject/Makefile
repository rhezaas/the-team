run:
	./manage.py runserver 0.0.0.0:8000

test:
	pytest -xs  ./ --cov ./ --cov-report html --cov-report term-missing:skip-covered --ds=dummyproject.settings --disable-pytest-warnings
