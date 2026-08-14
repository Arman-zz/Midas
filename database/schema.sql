CREATE DATABASE IF NOT EXISTS midas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE midas;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role ENUM('customer', 'shop', 'admin') NOT NULL DEFAULT 'customer',
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NULL,
  mobile VARCHAR(30) NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active', 'suspended', 'closed') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_mobile (mobile),
  KEY idx_users_role_status (role, status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS shop_profiles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(180) NOT NULL,
  owner_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(190) NOT NULL,
  trade_license VARCHAR(100) NOT NULL,
  tax_id VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  opening_hours VARCHAR(120) NULL,
  description VARCHAR(300) NULL,
  logo_url VARCHAR(500) NULL,
  latitude DECIMAL(10, 7) NULL,
  longitude DECIMAL(10, 7) NULL,
  verification_status ENUM('not_submitted', 'pending', 'verified', 'rejected') NOT NULL DEFAULT 'not_submitted',
  verified_at DATETIME NULL,
  verified_by BIGINT UNSIGNED NULL,
  rejection_reason VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_shop_user (user_id),
  UNIQUE KEY uq_shop_trade_license (trade_license),
  KEY idx_shop_verification (verification_status),
  CONSTRAINT fk_shop_user FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_shop_verifier FOREIGN KEY (verified_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS shop_verification_documents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  shop_id BIGINT UNSIGNED NOT NULL,
  document_type ENUM('trade_license', 'tax_certificate', 'owner_identity') NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  expires_on DATE NULL,
  reviewed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_shop_document_type (shop_id, document_type),
  CONSTRAINT fk_document_shop FOREIGN KEY (shop_id) REFERENCES shop_profiles (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  shop_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT NULL,
  price_bdt DECIMAL(14, 2) NOT NULL,
  weight_grams DECIMAL(10, 3) NOT NULL,
  purity VARCHAR(10) NOT NULL,
  minimum_installment_bdt DECIMAL(14, 2) NULL,
  image_url VARCHAR(500) NOT NULL,
  stock_status ENUM('in_stock', 'out_of_stock') NOT NULL DEFAULT 'in_stock',
  moderation_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_shop_status (shop_id, stock_status),
  KEY idx_products_moderation (moderation_status),
  CONSTRAINT fk_product_shop FOREIGN KEY (shop_id) REFERENCES shop_profiles (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  shop_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  purchase_type ENUM('direct', 'installment') NOT NULL,
  requested_value_bdt DECIMAL(14, 2) NOT NULL,
  status ENUM('pending', 'accepted', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
  responded_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_requests_shop_status (shop_id, status),
  KEY idx_requests_customer (customer_id),
  CONSTRAINT fk_request_customer FOREIGN KEY (customer_id) REFERENCES users (id),
  CONSTRAINT fk_request_shop FOREIGN KEY (shop_id) REFERENCES shop_profiles (id),
  CONSTRAINT fk_request_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS agreements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  agreement_no VARCHAR(50) NOT NULL,
  request_id BIGINT UNSIGNED NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  shop_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  target_gold_grams DECIMAL(12, 6) NOT NULL,
  purity VARCHAR(10) NOT NULL,
  installment_amount_bdt DECIMAL(14, 2) NOT NULL,
  start_date DATE NOT NULL,
  status ENUM('active', 'completed', 'cancelled', 'defaulted') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_agreement_no (agreement_no),
  UNIQUE KEY uq_agreement_request (request_id),
  KEY idx_agreements_customer_status (customer_id, status),
  KEY idx_agreements_shop_status (shop_id, status),
  CONSTRAINT fk_agreement_request FOREIGN KEY (request_id) REFERENCES purchase_requests (id) ON DELETE SET NULL,
  CONSTRAINT fk_agreement_customer FOREIGN KEY (customer_id) REFERENCES users (id),
  CONSTRAINT fk_agreement_shop FOREIGN KEY (shop_id) REFERENCES shop_profiles (id),
  CONSTRAINT fk_agreement_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS installment_schedule (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  agreement_id BIGINT UNSIGNED NOT NULL,
  installment_no SMALLINT UNSIGNED NOT NULL,
  due_date DATE NOT NULL,
  expected_amount_bdt DECIMAL(14, 2) NOT NULL,
  status ENUM('scheduled', 'paid', 'overdue', 'waived') NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_agreement_installment (agreement_id, installment_no),
  KEY idx_schedule_due_status (due_date, status),
  CONSTRAINT fk_schedule_agreement FOREIGN KEY (agreement_id) REFERENCES agreements (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_records (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  agreement_id BIGINT UNSIGNED NOT NULL,
  installment_schedule_id BIGINT UNSIGNED NULL,
  invoice_id VARCHAR(100) NOT NULL,
  amount_bdt DECIMAL(14, 2) NOT NULL,
  gold_rate_bdt_per_gram DECIMAL(14, 2) NOT NULL,
  gold_amount_grams DECIMAL(12, 6) NOT NULL,
  gold_rate_source VARCHAR(120) NOT NULL DEFAULT 'Live market API',
  gold_rate_updated_at DATETIME NULL,
  paid_on DATE NOT NULL,
  recorded_by BIGINT UNSIGNED NOT NULL,
  notes VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_payment_invoice (invoice_id),
  KEY idx_payments_agreement_date (agreement_id, paid_on),
  CONSTRAINT fk_payment_agreement FOREIGN KEY (agreement_id) REFERENCES agreements (id),
  CONSTRAINT fk_payment_schedule FOREIGN KEY (installment_schedule_id) REFERENCES installment_schedule (id) ON DELETE SET NULL,
  CONSTRAINT fk_payment_recorder FOREIGN KEY (recorded_by) REFERENCES users (id)
) ENGINE=InnoDB;

ALTER TABLE payment_records
  ADD COLUMN IF NOT EXISTS gold_rate_source VARCHAR(120) NOT NULL DEFAULT 'Live market API' AFTER gold_amount_grams,
  ADD COLUMN IF NOT EXISTS gold_rate_updated_at DATETIME NULL AFTER gold_rate_source;

CREATE TABLE IF NOT EXISTS c2c_listings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  seller_id BIGINT UNSIGNED NOT NULL,
  listing_type ENUM('jewelry', 'gold_weight') NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  price_bdt DECIMAL(14, 2) NOT NULL,
  weight_grams DECIMAL(10, 3) NULL,
  purity VARCHAR(10) NULL,
  image_url VARCHAR(500) NULL,
  area VARCHAR(180) NOT NULL,
  status ENUM('active', 'sold', 'withdrawn', 'moderation_hold') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_c2c_type_status (listing_type, status),
  KEY idx_c2c_seller (seller_id),
  CONSTRAINT fk_c2c_seller FOREIGN KEY (seller_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS commission_statements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  shop_id BIGINT UNSIGNED NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  qualifying_value_bdt DECIMAL(14, 2) NOT NULL,
  commission_rate DECIMAL(5, 2) NOT NULL,
  commission_due_bdt DECIMAL(14, 2) NOT NULL,
  status ENUM('draft', 'due', 'paid', 'waived') NOT NULL DEFAULT 'draft',
  paid_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_commission_shop_period (shop_id, period_start, period_end),
  CONSTRAINT fk_commission_shop FOREIGN KEY (shop_id) REFERENCES shop_profiles (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  notification_type VARCHAR(80) NOT NULL,
  title VARCHAR(180) NOT NULL,
  message VARCHAR(500) NOT NULL,
  action_url VARCHAR(255) NULL,
  read_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_notifications_user_read (user_id, read_at, created_at),
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS platform_settings (
  setting_key VARCHAR(100) NOT NULL,
  setting_value LONGTEXT NOT NULL,
  updated_by BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (setting_key),
  CONSTRAINT fk_setting_admin FOREIGN KEY (updated_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO platform_settings (setting_key, setting_value)
VALUES
  ('commission_rate', '2.0'),
  ('minimum_installment_bdt', '1000'),
  ('payment_edit_window_hours', '24'),
  ('partner_verification_required', 'true'),
  ('unique_invoice_ids_required', 'true'),
  ('gold_conversion_required', 'true')
ON DUPLICATE KEY UPDATE setting_key = VALUES(setting_key);
