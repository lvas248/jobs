## FAQ

#### What is this repo?

This is an app equipped with the following:

Backend: Rails,
Frontend: React
State Management: Redux
Styling: TailwindCSS

#### What is built in o the template?

The template arrives stocked with the following:

- functioning Login, Signup, Refresh, and logout functionality on the backend and the frontend.

NO email verification 
NO text verification



## Installation

Install my-project by visiting git hub repo and cllicking on use template to create a new repository frome the template.

Once the the repo has been created, simply clone the repo:

```bash
$ git clone git@github.com:lvas248/template-react-rails-tailwind.git
$ cd project_name
$ bundle install
```

cd into the root of the react file and install packages using npm

```bash
$ cd client
$ npm install
``` 

Next, head into config/database.yml and update the postgres db:

```bash
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: nyc_jobs_development //update this

  test:
  <<: *default
  database: nyc_jobs_template_test //update this

  production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>

```

Now create the db, in the root of the rails app:

```bash
$ rails db:create
```

Now that the db has been created, you can migrate:

```bash
$ rails db:migrate
```

## Deploying

This application has all the starter code needed to help you deploy your
application to Render. It's recommended to deploy your project early and push up
changes often to ensure that your code works equally well in production and
development environments.

The instructions in this section assume that you've already set up a Render
account, created a PostgreSQL instance in your account, and set up your
environment to deploy to Render. If you have not yet completed these steps, see
the Environment Setup section below.

### Create a Master Key File

In the project files, delete the `config/credentials.yml.enc` file. Then, in the
terminal, run the following:

```sh
$ EDITOR="code --wait" bin/rails credentials:edit
```

**Note**: if you use a different text editor than VS Code, you will need to replace
`code` with the appropriate command.

The command above will open a file in VS Code and wait for you to close it
before completing the process of creating the credential files. Once you've done
that, you should see both the `credentials.yml.enc` and `master.key` files in
the `config` folder. You will need the value in the `master.key` file to set up
the web service in Render.

Commit your changes and push them to GitHub.

### Create the App Database

Render allows users to create [multiple databases within a single PostgreSQL
instance][multiple dbs] using the PostgreSQL interactive terminal,
[`psql`][psql].

Navigate to your PostgreSQL instance from the Render dashboard, click the
"Connect" dropdown, then the External Connection tab, and copy the PSQL command.
Paste it into your terminal and press enter. This command connects you to the
remote PostgreSQL instance.

To create the database, run this SQL command:

```sql
CREATE DATABASE new_db_name;
```

Now if you run `\l` from the PSQL prompt, you should see a table that includes
your main PostgreSQL instance as well as the database you just created.

Run the `\q` command to exit PSQL.

[multiple dbs]: https://render.com/docs/databases#multiple-databases-in-a-single-postgresql-instance
[psql]: https://www.postgresql.org/docs/current/app-psql.html

### Create the Render Web Service

To deploy, click the "New +" button in Render and select "Web Service". You'll
see a list of all the repositories in your GitHub account. Find the repo you
want to deploy and click the "Select" button.

In the page that opens, enter a name for your app and make sure the Environment
is set to Ruby.

Scroll down and set the Build Command to `./bin/render-build.sh` and the Start
Command to `bundle exec puma -C config/puma.rb`.

Open a separate tab in your browser, navigate to the Render dashboard, and click
on your PostgreSQL instance. Scroll down to the "Connection" section, find the
"Internal Database URL", and copy it.

Return to the other tab. Scroll down and click the "Advanced" button, then click
"Add Environment Variable." Enter `DATABASE_URL` as the key, then paste in the
URL you just copied. Note that the URL will end with the name you gave your
PostgreSQL instance when you initially created it; be sure to remove that name
and replace it with the name of the database you created in the last section.

Click "Add Environment Variable" again. Add `RAILS_MASTER_KEY` as the key, and
paste the value in the `config/master.key` file you created earlier.

The completed page should look like this:

![Web service settings](https://curriculum-content.s3.amazonaws.com/phase-4/project-template/web-service-settings.png)

Scroll down to the bottom of the page and click "Create Web Service". The deploy
process will begin automatically.

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

We recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

## Documentation

[Documentation](https://linktodocumentation)

