# pull official base image
FROM python:3.12-slim-bullseye

# set work directory
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/logs

# set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH=/usr/src/app \
    DJANGO_SETTINGS_MODULE=dummyproject.settings \
    PORT=8000 \
    WEB_CONCURRENCY=3

# install dependencies
RUN apt-get update --fix-missing
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    curl \
    gcc \ 
    git \
    gnupg \
    libgeos-dev \
    libjpeg-dev \
    libjpeg62-turbo-dev \ 
    libpq-dev \ 
    libwebp-dev \
    lsb-release \ 
    sqlite3 \
    vim \
    wget \ 
    zlib1g-dev \
    zsh \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools

COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

COPY . .

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
RUN echo "zsh" > /root/.bashrc

RUN ./manage.py collectstatic --noinput

CMD gunicorn dummyproject.wsgi:application --bind 0.0.0.0:8000
