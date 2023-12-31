class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.boolean :email_verified, default: false
      t.string :password_digest

      t.timestamps
    end
  end
end
