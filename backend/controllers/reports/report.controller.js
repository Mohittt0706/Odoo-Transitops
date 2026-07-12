const reportService = require('../../services/report.service');
const { sendSuccess } = require('../../utils/responseHandler');

const overview = async (req, res, next) => {
  try {
    const data = await reportService.overview(req.query);
    sendSuccess(res, data, 'Overview report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const fleet = async (req, res, next) => {
  try {
    const data = await reportService.fleet(req.query);
    sendSuccess(res, data, 'Fleet report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const trips = async (req, res, next) => {
  try {
    const data = await reportService.trips(req.query);
    sendSuccess(res, data, 'Trip report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const drivers = async (req, res, next) => {
  try {
    const data = await reportService.drivers(req.query);
    sendSuccess(res, data, 'Driver report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const finance = async (req, res, next) => {
  try {
    const data = await reportService.finance(req.query);
    sendSuccess(res, data, 'Finance report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const maintenance = async (req, res, next) => {
  try {
    const data = await reportService.maintenance(req.query);
    sendSuccess(res, data, 'Maintenance report fetched successfully');
  } catch (error) {
    next(error);
  }
};

const exportCSV = async (req, res, next) => {
  try {
    const { type } = req.query;
    const reportService = require('../../services/report.service');
    const { Parser } = require('json2csv');
    let data = {};
    let rows = [];
    if (type === 'fleet') data = await reportService.fleet(req.query);
    else if (type === 'trips') data = await reportService.trips(req.query);
    else if (type === 'drivers') data = await reportService.drivers(req.query);
    else if (type === 'finance') data = await reportService.finance(req.query);
    else if (type === 'maintenance') data = await reportService.maintenance(req.query);
    else data = await reportService.overview(req.query);
    rows = [data];
    if (data.fleet) rows = [data.fleet, data.trips, data.drivers, data.finance, data.maintenance, data.analytics].filter(Boolean);
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

const exportPDF = async (req, res, next) => {
  try {
    const { type } = req.query;
    const reportService = require('../../services/report.service');
    const PDFDocument = require('pdfkit');
    let data = {};
    if (type === 'fleet') data = await reportService.fleet(req.query);
    else if (type === 'trips') data = await reportService.trips(req.query);
    else if (type === 'drivers') data = await reportService.drivers(req.query);
    else if (type === 'finance') data = await reportService.finance(req.query);
    else if (type === 'maintenance') data = await reportService.maintenance(req.query);
    else data = await reportService.overview(req.query);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    doc.pipe(res);
    doc.fontSize(20).text('FleetPilot Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Generated: ${new Date().toISOString()}`);
    doc.moveDown();
    doc.fontSize(16).text('Report Data');
    doc.moveDown();
    doc.fontSize(12).text(JSON.stringify(data, null, 2));
    doc.end();
  } catch (error) {
    next(error);
  }
};

module.exports = { overview, fleet, trips, drivers, finance, maintenance, exportCSV, exportPDF };