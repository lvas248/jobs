class CreateVerifications < ActiveRecord::Migration[6.1]
  def change
    create_table :verifications do |t|
      t.string :code
      t.datetime :expires_at
      t.references :user, null: false, foreign_key: true
      t.integer :attempts

      t.timestamps
    end
  end
end
