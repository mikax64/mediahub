"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const auth_guard_1 = require("./auth.guard");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(service) {
        this.service = service;
    }
    search(query, sortBy) {
        return this.service.getMovies(query, sortBy);
    }
    get(id, res) {
        const movie = this.service.getMovie(id);
        if (!movie)
            return res.status(common_1.HttpStatus.NOT_FOUND).end();
        return res.json(movie);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('sortBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Array)
], MoviesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "get", null);
MoviesController = __decorate([
    (0, common_1.Controller)('movies'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map