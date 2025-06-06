import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import logger from '../src/config/logger';

describe('Logger Configuration', () => {
  const logsDir = path.join(__dirname, '../logs');

  // Ensure logs directory exists
  it('should create logs directory', () => {
    expect(fs.existsSync(logsDir)).toBe(true);
  });

  // Test log file creation
  it('should create log files', () => {
    const logFiles = [
      'error.log',
      'combined.log',
      'exceptions.log',
      'rejections.log'
    ];

    logFiles.forEach(fileName => {
      const filePath = path.join(logsDir, fileName);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  // Test logging methods
  it('should have correct log levels', () => {
    // Verify logger has expected methods
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
    expect(logger.warn).toBeDefined();
  });
});