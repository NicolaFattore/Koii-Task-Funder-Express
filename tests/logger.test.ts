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
  it('should log messages', () => {
    // Capture console output
    const originalConsoleLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => logs.push(args.join(' '));

    // Log test messages
    logger.info('Test info message');
    logger.error('Test error message');
    logger.warn('Test warning message');

    // Restore console.log
    console.log = originalConsoleLog;

    // Check if logs were generated
    expect(logs.length).toBeGreaterThan(0);
  });
});