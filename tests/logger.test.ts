import { describe, it, expect, vi } from 'vitest';
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
  it('should support various log levels', () => {
    // Mock Winston transports to verify logging
    const transportMock = {
      log: vi.fn()
    };

    // Temporarily add mock transport
    logger.add(transportMock);

    // Log test messages
    logger.info('Test info message');
    logger.error('Test error message');
    logger.warn('Test warning message');

    // Check if log methods were called
    expect(transportMock.log).toHaveBeenCalledTimes(3);

    // Remove mock transport
    logger.remove(transportMock);
  });
});